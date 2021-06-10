import { HttpClient } from '@angular/common/http';
import { NotificationsService } from './../../../common/services/notifications/notifications.service';
import { ThingsService } from 'app/common/services/things/things.service';
import { Thing, Grafana} from 'app/common/interfaces/mainflux.interface';
import { Component, OnInit,AfterViewInit, ViewChild, ElementRef  } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'environments/environment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ngx-grafana-details',
  templateUrl: './grafana.details.component.html',
  // template:'<iframe #iframe frameborder="0"></iframe>',
  styleUrls: ['./grafana.details.component.scss'],
})
export class GrafanaDetailsComponent implements  OnInit, AfterViewInit {
  @ViewChild('iframe', { static: true }) iframeDoc: ElementRef;
  grafana: Grafana;
  orgId = '1'
  iframeGrafana: any;
  constructor(
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer,
    private thingsService: ThingsService,
    private http: HttpClient,
    private notificationsService: NotificationsService,
  ) { 
    
  }


  ngOnInit() {
    // const id = this.route.snapshot.paramMap.get('id');
    // this.thingsService.getThing(id)
    // this.thingsService.getThing(id).subscribe(
    //   (th: Thing) => {
    //     this.grafana = <Grafana> th.metadata.grafana;
    //     if (this.grafana !== undefined ){
    //       this.http.get(`${environment.grafanaUrl}/${this.grafana.dashboard}?orgId=${this.grafana.orgId}&var-thing=${id}&kiosk`, {responseType: 'text', observe: 'body' })
    //       .subscribe(blob => {
    //         this.iframeGrafana = this.domSanitizer.bypassSecurityTrustHtml(blob);
    //       });
     
    //     } else {
    //       this.notificationsService.warn('No grafana dashboard configured','');
    //     }
    //   },
    // );
  }


ngAfterViewInit() {
  const id = this.route.snapshot.paramMap.get('id');
    this.thingsService.getThing(id)
    this.thingsService.getThing(id).subscribe(
      (th: Thing) => {
        this.grafana = <Grafana> th.metadata.grafana;
        if (this.grafana !== undefined ){
          this.iframeGrafana =  this.domSanitizer.bypassSecurityTrustResourceUrl(`${environment.grafanaUrl}/${this.grafana.dashboard}?orgId=${this.grafana.orgId}&var-thing=${id}&kiosk`)
          
          // this.http.get(`${environment.grafanaUrl}/${this.grafana.dashboard}?orgId=${this.grafana.orgId}&var-thing=${id}&kiosk`, {responseType: 'text', observe: 'body' })
          // .subscribe(blob => {
          //   let doc = this.iframeDoc.nativeElement.contentDocument || this.iframeDoc.nativeElement.contentWindow;
          //   doc.open();
          //   doc.write(blob);
          //   doc.close();
          // });
     
        } else {
          this.notificationsService.warn('No grafana dashboard configured','');
        }
      },
    );

}
}
