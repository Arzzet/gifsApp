import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { Gif, SearchGifsresponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private apiKey: string = 'Ohkz307eVGNM0Uvf75gLUE7jSfQZxc8w';
  private _historial: string[] = [];

  public resultados: Gif[] = [];

  

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient){
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    // if(localStorage.getItem('historial')) {
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }

    this.resultados = JSON.parse(localStorage.getItem('ultimoResultado')!) || [];
  }

  buscarGifs(query: string) {

    query = query.trim().toLocaleLowerCase();
    
    if(!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }

    this.http.get<SearchGifsresponse>(`https://api.giphy.com/v1/gifs/search?api_key=Ohkz307eVGNM0Uvf75gLUE7jSfQZxc8w&q=${query}&limit=10`)
    .subscribe( (resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('ultimoResultado', JSON.stringify(this.resultados));
    });
    

    // console.log(this._historial);
  }
  
}
