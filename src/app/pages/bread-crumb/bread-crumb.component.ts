import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [NgForOf, NgIf, RouterLink],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.css'
})
export class BreadCrumbComponent {
  breadcrumbs: Array<{ label: string, url: string | null }> = [];

  constructor(private router: Router) {
    setTimeout(() => {
      this.router.events
        .pipe(filter(event => event instanceof NavigationEnd))
        .subscribe(() => this.buildBreadcrumbs());

      this.buildBreadcrumbs();
    }, 0);
  }

  buildBreadcrumbs() {
    this.breadcrumbs = [];
    let url = '';
    let snapshot = this.router.routerState.snapshot.root;

    while (snapshot) {
      const routePath = snapshot.routeConfig?.path ?? '';
      const breadcrumb = snapshot.routeConfig?.data?.['breadCrumb'];
      const label = snapshot.routeConfig?.data?.['breadCrumbLabel'];

      const segments = routePath.split('/').map(segment => {
        if (segment.startsWith(':')) {
          const paramName = segment.slice(1);
          return snapshot.params[paramName];
        }
        return segment;
      });

      if (segments.length > 0 && segments[0] !== '') {
        url += '/' + segments.join('/');
      }

      if (breadcrumb) {
        const isDynamic = routePath.includes(':');
        const lastSegment = segments.at(-1);
        const crumbLabel = label || (isDynamic ? lastSegment : routePath);

        this.breadcrumbs.push({
          label: crumbLabel,
          url: snapshot.firstChild ? url : null // последняя крошка без ссылки
        });
      }

      snapshot = snapshot.firstChild!;
    }
  }
}
