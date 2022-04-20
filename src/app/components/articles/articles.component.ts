import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../models/Article.model';
import { ArticleService } from '../../services/article.service';
import { NotifierService } from 'angular-notifier';
import { Notifier } from '../../tools/notifier';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles!: any[];
  alertNotifier = false;
  notifier!: Notifier;
  nb = 0;
  p: number = 1;

  constructor(private articleService: ArticleService, private route: Router) { }

  ngOnInit(): void {
    this.emitArticles();
  }

  emitArticles(){
    this.articleService.getArticles()
    .subscribe(
      (data: any) => {
        this.articles = data;
        this.nb = this.articles.length;
      },
      (error) => {
        this.alertNotifier = true;
        this.notifier = new Notifier("Upps!!! Une erreur c'est produit : "+error, "red");
      }
      );
  }

  chargerFlux(){
    this.articleService.getFlux()
    .subscribe(
      (data: any) => {
        this.emitArticles();
      },
      (error) => {
        this.alertNotifier = true;
        this.notifier = new Notifier("Upps!!! Une erreur c'est produit : "+error, "red");
      }
      );
  }

  onViewArticle(article: Article) {
    this.route.navigate(['single-article/', article.id]);
  }

}
