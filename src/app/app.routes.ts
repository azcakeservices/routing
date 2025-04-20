import { Routes } from '@angular/router';
import {ProductPageComponent} from './pages/product-page/product-page.component';

export const Mapping: Routes = [
  {
    path: 'products',
    data: { breadCrumb: true, breadCrumbLabel: 'products' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/cards/card-product/card-product.component')
            .then((c) => c.CardProductComponent),
      },
      {
        path: ':productId',
        data: { breadCrumb: true },
        loadComponent: () =>
          import('../app/pages/cards/card-product-detail/card-product-detail.component')
            .then((c) => c.CardProductDetailComponent),
      }
    ]
  }
];

export const Payments: Routes = [
  {
    path: 'transactions',
    data: { breadCrumb: true, breadCrumbLabel: 'transactions' },
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../app/pages/transactions/transaction-list/transaction-list.component')
            .then((c) => c.TransactionListComponent),
      },
      {
        path: ':transactionId',
        data: { breadCrumb: true },
        loadComponent: () =>
          import('../app/pages/transactions/transaction-detail/transaction-detail.component')
            .then((c) => c.TransactionDetailComponent),
      }
    ]
  }
];

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () => import('../app/pages/product-page/product-page.component').then(m => m.ProductPageComponent)
  },
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () =>
      import('../app/layout/layout.component')
        .then((c) => c.LayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'cards', children: Mapping },
      { path: 'payments', children: Payments }
    ]
  }
];
