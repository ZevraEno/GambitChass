import {Component} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PanelMenu} from 'primeng/panelmenu';
import {CardModule} from 'primeng/card';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    PanelMenu,
    CardModule,
    RouterOutlet,


  ],
  styles: `
    :host {
      display: flex;
      height: 100vh;
    }

    aside, main {
      overflow: auto;
    }

    aside {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 1rem;
      text-align: center;
      background: linear-gradient(132deg, rgb(251, 251, 255) 0.00%, rgb(215, 223, 252) 100.00%);

      h1 {
        color: rgba(0, 0, 0, 0.3);
        margin: 0;
        margin-block-end: 0;
        padding: 1rem;
        border: 1px solid rgba(0, 0, 0, 0.3);
      }

      img {
        margin: 0 auto;
        max-width: 70%;
      }
    }

    main {
      flex: 4;
      padding: 1rem;
    }
  `,
  template: `
    <aside>
      <p-panel-menu [model]="items"/>
      <img src="https://cdn-icons-png.flaticon.com/512/12595/12595944.png" alt="logo">
    </aside>
    <main>
      <router-outlet/>
    </main>
  `
})
export class AppComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: '/home',
    },
    {
      label: 'Tournaments',
      icon: 'pi pi-home',
      routerLink: '/tournament',
    },
    {
      label: 'Login',
      icon: 'pi pi-user',
      routerLink: '/login',
    },
    {
      label: 'Register',
      icon: 'pi pi-user-plus',
      routerLink: '/register',
    }
  ];
}
