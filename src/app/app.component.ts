import {Component, computed, effect, inject, Signal, WritableSignal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {PanelMenu} from 'primeng/panelmenu';
import {CardModule} from 'primeng/card';
import {Router, RouterOutlet} from '@angular/router';
import {UserTokenDto} from './features/auth/models/user-token-dto';
import {AuthService} from './features/auth/services/auth.service';
import {MenuItem} from 'primeng/api';

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
  private readonly _authService: AuthService = inject(AuthService);
  private readonly _router: Router = inject(Router);
  items: MenuItem[] = [];
  currentUser: WritableSignal<UserTokenDto | undefined>;
  isConnected: Signal<boolean>;
  role: Signal<string | undefined>;

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
          // TODO: Add USERS-only menu links
          this.items = [
            ...this.items,
            {
              label: 'UrUser (ToDelete)',
            },
          ];
        } else if (this.role() === 'ADMIN') {
          // TODO: Add ADMIN-only menu links
          this.items = [
            ...this.items,
            {
              label: 'UrAdmin (ToDelete)',
            },
          ];
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
}
