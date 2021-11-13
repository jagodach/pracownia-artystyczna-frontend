import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem('token') == null){
      let elements: HTMLCollectionOf<Element> = document.getElementsByClassName('hiddable');
      for (let i = 0; i < elements.length; i++){
        let link: HTMLAnchorElement =  elements.item(i) as HTMLAnchorElement;
        link.style.visibility = 'hidden';
      }
    }
  }

  public static changeVisiblity(visible: Boolean){
    let elements: HTMLCollectionOf<Element> = document.getElementsByClassName('hiddable');
    if (visible == true){
      for (let i = 0; i < elements.length; i++){
        let link: HTMLAnchorElement =  elements.item(i) as HTMLAnchorElement;
        link.style.visibility = 'visible';
      }
    } else {
      for (let i = 0; i < elements.length; i++){
        let link: HTMLAnchorElement =  elements.item(i) as HTMLAnchorElement;
        link.style.visibility = 'hidden';
      }
    }
  }

  public logout(){
    localStorage.removeItem('token');
    NavbarComponent.changeVisiblity(false);
    this.router.navigate(['/main']);
  }

}
