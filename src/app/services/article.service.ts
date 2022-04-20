import { Injectable } from '@angular/core';
// import { Subject, Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ApiService } from './api.service';
import { Article } from '../models/Article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private api: ApiService) {}

  // recupération duflux rss
  getFlux() {
    return this.api.obtenir('init');
  }

  // recupération de la liste des articles
  getArticles() {
    return this.api.obtenir('articles');
  }

  // recupération d'un article
  getSingleArticle(id: number) {
    return this.api.obtenir('articles/'+id);
  }

  // Ajout d'un article : fonction non demandée
  // addArticle(article: Article): Observable<Article> {
  //   return this.api.ajouter('articles', article);
  // }

  // modification d'un article
  setArticle(id: number, article: Article): Observable<Article> {
    return this.api.modifierSimple('articles/' + id, article);
  }

  // suppression d'un article : fonction non demandée
  // removeArticle(article: Article): Observable<Article> {
  //   return this.api.supprimer('articles/' + article.id);
  // }
}
