import { Media } from './Media.model';

export class Article {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public link?: string,
    public pubDate?: string,
    public media?: Media,
  ) {}
}
