import {Component, computed, effect, inject, Signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PanelMenu} from 'primeng/panelmenu';
import {CardModule} from 'primeng/card';
import {Router, RouterOutlet} from '@angular/router';
import {UserTokenDto} from './features/auth/models/user-token-dto';
import {AuthService} from './features/auth/services/auth.service';
import {MenuItem} from 'primeng/api';
import {NgClass} from '@angular/common';
import {Dialog} from 'primeng/dialog';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    PanelMenu,
    CardModule,
    RouterOutlet,
    NgClass,
    Dialog,
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
      background-image: linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%);

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

    .aside-admin {
      background-image: linear-gradient(to top, #f77062 0%, #fe5196 100%);
    }

    .aside-user {
      background-image: linear-gradient(to top, #96fbc4 0%, #f9f586 100%);
    }

    main {
      flex: 4;
      padding: 1rem;
    }
  `,
  template: `
    <aside [ngClass]="{
      'aside-admin': role() === 'ADMIN',
      'aside-user': role() === 'USER'
    }">
      <p-panel-menu [model]="items"/>
      <img
        (click)="showDialog()"
        src="https://cdn-icons-png.flaticon.com/512/12595/12595944.png"
        alt="logo">
    </aside>

    <p-dialog
      [(visible)]="displayModal"
      [style]="{background: 'transparent !important', border: 0, boxShadow: 'none', width: '50vw'}"
      modal="true">
      <ng-template #headless>
        <img
          (click)="closeDialog()"
          src="https://c.tenor.com/gKwBHj7Gg8cAAAAC/tenor.gif"
          alt="dylan">
      </ng-template>
    </p-dialog>

    <main>
      <router-outlet/>
    </main>
  `
})
export class AppComponent {
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  items: MenuItem[] = [];
  currentUser: WritableSignal<UserTokenDto | undefined>;
  isConnected: Signal<boolean>;
  role: Signal<string | undefined>;
  displayModal: boolean = false;

  constructor() {
    this.currentUser = this._authService.currentUser;
    this.isConnected = computed(() => !!this.currentUser());
    this.role = computed(() => this.currentUser()?.user.role);
    effect(() => {
      this.items = [
        {
          label: 'Home',
          icon: 'pi pi-home',
          routerLink: '/home',
          routerLinkActiveOptions: {exact: true},
        },
        {
          label: 'Tournaments',
          icon: 'pi pi-trophy',
          routerLink: '/tournament',
          routerLinkActiveOptions: {exact: false},
        }
      ];
      if (this.isConnected()) {
        this.items = [
          ...this.items,
          {
            label: 'Profile',
            icon: 'pi pi-user',
            routerLink: '/profile',
            routerLinkActiveOptions: {exact: true},
          },
          {
            label: 'Stats',
            icon: 'pi pi-chart-bar',
            routerLink: '/stats',
            routerLinkActiveOptions: {exact: true},
          },
          {
            label: 'Logout',
            icon: 'pi pi-sign-out',
            command: () => {
              this._authService.logout();
              this._router.navigate(['/']).then();
            }
          }
        ];
        if (this.role() === 'USER') {
          // this.items = [
          //   ...this.items,
          //   {
          //     label: 'You are USER',
          //     icon: 'pi pi-exclamation-circle',
          //     disabled: true,
          //   },
          // ];
        } else if (this.role() === 'ADMIN') {
          // this.items = [
          //   ...this.items,
          //   {
          //     label: 'You are ADMIN',
          //     icon: 'pi pi-exclamation-circle',
          //     disabled: true,
          //   },
          // ];
        }
      } else {
        this.items = [
          ...this.items,
          {
            label: 'Login',
            icon: 'pi pi-user',
            routerLink: '/login',
            routerLinkActiveOptions: {exact: true},
          },
          {
            label: 'Register',
            icon: 'pi pi-user-plus',
            routerLink: '/register',
            routerLinkActiveOptions: {exact: true},
          }
        ];
      }
    });
  }

  closeDialog() {
    this.displayModal = false;
  }

  showDialog() {
    this.displayModal = true;
  }
}
