import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, mergeMap } from 'rxjs';
import { Observable } from 'rxjs';
import { Address } from '../../../auth/models/auth.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
declare var google: any;
@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  constructor(private http: HttpClient) {}

  shipping_address$: BehaviorSubject<Address | null> =
    new BehaviorSubject<Address | null>(null);

  getCategories(): Observable<HttpResponse<any>> {
    return this.http.get(environment.apiUrl + 'common/categories', {
      observe: 'response',
    });
  }

  getAddressWithGoogleApi(
    latitude: number,
    longitude: number
  ): Observable<any> {
    return new Observable((subscriber) => {
      var latlng = new google.maps.LatLng(latitude, longitude);
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ latlng }, (results: any, status: any) => {
        if (status !== google.maps.GeocoderStatus.OK) {
          subscriber.error();
          subscriber.complete();
        }
        let address = null;
        if (results && results instanceof Array && results.length > 0) {
          address = results[0].formatted_address;
        }
        if (status === google.maps.GeocoderStatus.OK && address) {
          subscriber.next({ ...address, latitude, longitude });
          subscriber.complete();
        } else {
          subscriber.complete();
        }
      });
    });
  }

  RAPID_API_KEY = '154dffa864msh70ea9369b5b5094p15af15jsnab9f9e2823ce';

  getAddressWithRapidApi(latitude: number, longitude: number) {
    return this.http.get(
      `https://forward-reverse-geocoding.p.rapidapi.com/v1/reverse?lat=${latitude}&lon=${longitude}&'accept-language'='en'&polygon_threshold='0.0'`,
      {
        headers: new HttpHeaders()
          .set('X-RapidAPI-Key', this.RAPID_API_KEY)
          .set('X-RapidAPI-Host', 'forward-reverse-geocoding.p.rapidapi.com'),
      }
    );
  }

  GEOAPIFY_KEY = '16b317d94c764b60992813bc56a7dc35';
  getAddressWithGeoapify(
    latitude: number,
    longitude: number
  ): Observable<Address | null> {
    return this.http
      .get(
        `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${this.GEOAPIFY_KEY}`
      )
      .pipe(
        map((response: any) => {
          if (response?.features instanceof Array) {
            const address = response.features[0].properties;
            if (address) {
              return {
                name: address.name,
                address_line1: address.address_line1,
                address_line2: address.address_line2,
                city: address.city,
                state: address.state,
                country: address.country,
                zip_code: address.postcode,
                latitude: address.lat,
                longitude: address.lon,
              };
            }
          }
          return null;
        })
      );
  }

  getFullAddress(): Observable<Address | null> {
    return this.currentLocation().pipe(
      mergeMap((result) =>
        this.getAddressWithGeoapify(
          result.coords.latitude,
          result.coords.longitude
        )
      )
    );
  }

  currentLocation(): Observable<GeolocationPosition> {
    return new Observable((subscriber) => {
      if (window?.navigator?.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            subscriber.next(position);
            subscriber.complete();
          }
        );
      } else {
        subscriber.error();
        subscriber.complete();
      }
    });
  }

  fetchUserAddress(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}users/address?id=${id}`, {
      observe: 'body',
    });
  }

  removeUserAddress(payload: {
    user_id: string;
    address_id: string;
  }): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}users/address/delete`,
      payload,
      {
        observe: 'response',
      }
    );
  }

  saveUserAddress(id: string, address: Address): Observable<HttpResponse<any>> {
    return this.http.post(
      `${environment.apiUrl}users/address/save?id=${id}`,
      address,
      { observe: 'response' }
    );
  }
}
