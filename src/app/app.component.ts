import { Component, VERSION } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Angular ' + VERSION.major;
  text: string;
  traslatedText: string;

  private key = 'AIzaSyCf0Xy0OnhxlduyEt3K8zP-sOuu-l_u6uA';
  private url = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  onkeyUp(text: string) {
    if (text) {
      this.translate(text);
    } else {
      this.translate('');
    }
  }

  translate(q: string) {
    this.http
      .post<any>(`${this.url}?key=${this.key}`, { q, target: 'he', })
      .pipe(
        debounceTime(400), distinctUntilChanged())
        .subscribe((res) => {
          console.log(res.data.translations[0].translatedText);
          this.traslatedText = res.data.translations[0].translatedText;
        });
  }
}
