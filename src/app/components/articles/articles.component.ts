import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Article } from '../../models/Article.model';
import { ArticleService } from '../../services/article.service';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles!: any[];
  p: number = 1;

  constructor(private articleService: ArticleService, private route: Router, private notifier: NotifierService) { }

  ngOnInit(): void {
    this.emitArticles();
  }

  emitArticles(){
    this.articleService.getArticles()
    .subscribe(
      (data: any) => {
        this.articles = data;
        // console.log(this.articles);
      },
      (error) => {
        console.log("error")
        this.notifier.notify('error', 'Upps!!! Une erreur c\'est produit : '+error);
      }
      );
  }

  onViewArticle(article: Article) {
    this.route.navigate(['single-article/', article.id]);
  }

}
