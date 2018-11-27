'use strict';
import { TestBed, async } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ElementRef } from '@angular/core';
import { StorageServiceModule, SESSION_STORAGE } from 'angular-webstorage-service';
import { JL } from 'jsnlog';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';

import { ActionLink } from './action-dropdown.component';
import { ActionDropdown } from './action-dropdown.component';
import { PageService } from '../../../../services/page.service';
import { CustomHttpClient } from '../../../../services/httpclient.service';
import { LoaderService } from '../../../../services/loader.service';
import { ConfigService } from '../../../../services/config.service';
import { Page } from '../../../../shared/app-config.interface';
import { ParamConfig } from '../../../../shared/param-config';
import { Param } from '../../../../shared/param-state';
import { WebContentSvc } from '../../../../services/content-management.service';
import { LoggerService } from '../../../../services/logger.service';
import { SessionStoreService, CUSTOM_STORAGE } from '../../../../services/session.store';
import { AppInitService } from '../../../../services/app.init.service';
import { Image } from '../../image.component';
import { Link } from '../../link.component';
import { SvgComponent } from '../../svg/svg.component';

let fixture, app, pageservice, configservice;

class MockLoggerService {
    debug() { }
    info() { }
    error() { }
}

describe('ActionLink', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActionLink,
        Image,
        Link,
        SvgComponent
       ],
       imports: [
           HttpModule,
           HttpClientTestingModule,
           StorageServiceModule,
           AngularSvgIconModule
       ],
       providers: [
        { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
        { provide: 'JSNLOG', useValue: JL },
        {provide: LoggerService, useClass: MockLoggerService},
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        Location,
        PageService,
        CustomHttpClient,
        LoaderService,
        ConfigService,
        SessionStoreService,
        AppInitService
       ]
    }).compileComponents();
    fixture = TestBed.createComponent(ActionLink);
    app = fixture.debugElement.componentInstance;
    pageservice = TestBed.get(PageService);
    configservice = TestBed.get(ConfigService);
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('getAllURLParams() should return null', async(() => {
    expect(app.getAllURLParams('www.test.com')).toBeFalsy();
  }));

  it('processOnClick() should call processEvent', async(() => {
    spyOn(pageservice, 'processEvent').and.callThrough();
    let param = new Param(configservice);
    param.enabled = true;
    app.element = param;
    app.processOnClick('test');
    expect(pageservice.processEvent).toHaveBeenCalled();
  }));

  it('processOnClick() should not call processEvent', async(() => {
    spyOn(pageservice, 'processEvent').and.callThrough();
    let param = new Param(configservice);
    param.enabled = false;
    app.element = param;
    app.processOnClick('test');
    expect(pageservice.processEvent).not.toHaveBeenCalled();
  }));

});

class MockElementRef {

}

class MockPageService {
    processEvent(a, b, c) {}
}

describe('ActionDropdown', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [
            ActionDropdown,
            ActionLink,
            Image,
            Link,
            SvgComponent
         ],
         imports: [
            HttpModule,
            HttpClientTestingModule,
            BrowserAnimationsModule,
            AngularSvgIconModule
        ],
         providers: [
            {provide: ElementRef, useClass: MockElementRef},
            {provide: PageService, useClass: MockPageService},
            { provide: CUSTOM_STORAGE, useExisting: SESSION_STORAGE },
            { provide: 'JSNLOG', useValue: JL },
            { provide: LocationStrategy, useClass: HashLocationStrategy },
            Location,
            WebContentSvc,
            CustomHttpClient,
            LoaderService,
            ConfigService,
            AppInitService
         ]
      }).compileComponents();
      fixture = TestBed.createComponent(ActionDropdown);
      app = fixture.debugElement.componentInstance;
      pageservice = TestBed.get(PageService);
    }));
  
    it('should create the app', async(() => {
      expect(app).toBeTruthy();
    }));

    it('app should create elementRef property', async(() => {
        expect(app.elementRef).toBeTruthy();
    }));

    it('toggleOpen() should call dropDownClick.emit()', async(() => {
        const eve = {
            preventDefault: () => {}
        };
        spyOn(eve, 'preventDefault').and.callThrough();
        spyOn(app.dropDownClick, 'emit').and.callThrough();
        app.toggleOpen(eve);
        expect(eve.preventDefault).toHaveBeenCalled();
        expect(app.dropDownClick.emit).toHaveBeenCalled();
    }));

    it('processOnClick() should call pageservice.processEvent()', async(() => {
        spyOn(pageservice, 'processEvent').and.callThrough();
        app.processOnClick('test');
        expect(pageservice.processEvent).toHaveBeenCalled();
    }));

    it('animationStart() should not update isHidden property', async(() => {
        app.isHidden = true;
        app.animationStart('test');
        expect(app.isHidden).toBeFalsy();
    }));

    it('animationDone() should update isHidden property', async(() => {
        app.isOpen = false;
        app.isHidden = false;
        app.animationDone('');
        expect(app.isHidden).toBeTruthy();
      }));

      it('animationDone() should not update isHidden property', async(() => {
        app.isOpen = true;
        app.isHidden = false;
        app.animationDone('');
        expect(app.isHidden).toBeFalsy();
      }));

      it('element proprty should be equal to element.enabled', async(() => {
          app.element = {
              enabled: 'test'
          };
        expect(app.enabled).toEqual('test');
      }));

      it('enabled property should not be created', async(() => {
        expect(app.enabled).toBeFalsy();
      }));
  
  });