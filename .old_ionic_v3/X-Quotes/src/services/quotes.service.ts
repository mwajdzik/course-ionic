import {Quote} from "../data/quote.interface";

export class QuotesService {

  private favoriteQuotes: Quote[] = [];

  public addQuoteToFavorites(quote: Quote) {
    this.favoriteQuotes.push(quote);
  }

  public removeQuoteFromFavorites(quote: Quote) {
    const index = this.favoriteQuotes.findIndex((q) => {
      return quote.id === q.id;
    });
    this.favoriteQuotes.splice(index, 1);
  }

  public getFavoritesQuotes(): Quote[] {
    return this.favoriteQuotes.slice();
  }

  public isFavorite(quote: Quote): boolean {
    return this.favoriteQuotes.some((q: Quote) => {
      return q.id == quote.id;
    });
  }
}
