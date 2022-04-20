import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/Article.model';
import { ArticleService } from '../../services/article.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { Notifier } from '../../tools/notifier';

@Component({
  selector: 'app-single-article',
  templateUrl: './single-article.component.html',
  styleUrls: ['./single-article.component.css']
})
export class SingleArticleComponent implements OnInit {

  article: any;
  editMode = false;
  alertNotifier = false;
  notifier!: Notifier;

  articleForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private location: Location, private articleService: ArticleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getArticle(this.route.snapshot.params['id']);
    this.initForm();
  }

  getArticle(id: number) {
    this.articleService.getSingleArticle(id)
    .subscribe(
      (data: any) => {
        this.article = data;
        // console.log(data);
      },
      (error) => {
        this.alertNotifier = true;
        this.notifier = new Notifier("Upps!!! Une erreur c'est produit : "+error, "red");
      }
      );
  }

  editArticle() {
    this.editMode = !this.editMode;
  }

  initForm() {
    this.articleForm = this.formBuilder.group({
      title : ['', Validators.required],
      description : ['', Validators.required],
    });
  }

  saveArticle() {
    this.articleService.setArticle(this.article.id, JSON.parse(
      '{"title":"'+this.article.title+
      '","description":"'+this.article.description+
      '"}'))
    .subscribe(
      (data) => {
        this.alertNotifier = true;
        this.notifier = new Notifier("Modification faite avec succé", "green");
        this.article = data;
        this.editArticle();
      },
      (error) => {
        this.alertNotifier = true;
        this.notifier = new Notifier("Upps!!! Une erreur c'est produit : "+error, "red");
      });
  }

  back() {
    this.location.back();
  }

}
