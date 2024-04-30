import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject } from 'rxjs';
import { ActionType, LocalActionType } from '../classes/constants';
import { selectionStatus } from '../classes/interfaces';
import { Profile } from '../classes/profile';
import { AppStoreService } from '../store/app-store.service';
import { profilesSelector } from '../store/selectors';
import { JsonValidatorService } from './json-validator.service';
import * as saveAs from 'file-saver';
import { randomBetween } from '../classes/commons';

@Injectable({
  providedIn: 'root',
})
export class SimpleProfileService {
  profiles$: Observable<Profile[]>;
  selections: Profile[] = [];
  selectionCleared = new Subject<void>();
  private selectonListener: (() => void) | undefined;
  private clickListenerActive = false;
  private renderer: Renderer2;

  constructor(
    rendererFactory: RendererFactory2,
    private validator: JsonValidatorService,
    private store: AppStoreService,
    private toastr: ToastrService
  ) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.profiles$ = this.store.selector(profilesSelector);
    this.fetchFromLocalStorage();
    this.SelectionClickHandler = this.SelectionClickHandler.bind(this);
  }

  remove(profileName: string) {
    this.store.dispatch(ActionType.REMOVE_PROFILE, { name: profileName });
    this.setLocalStorage();
  }

  add(profileName: string) {
    this.store.dispatch(ActionType.ADD_PROFILE, {
      name: profileName,
      hue: randomBetween(0, 360),
    });
    this.setLocalStorage();
  }

  exportProfiles() {
    const profiles = this.getCurrentProfiles();
    if (profiles.length > 0) {
      return saveAs(
        new Blob([JSON.stringify(profiles, null, 2)], { type: 'JSON' }),
        'my_profiles.prf'
      );
    } else {
      this.toastr.error('There are no profiles to export');
    }
  }
  //multi-selection functions
  SelectionClickHandler(event: MouseEvent) {
    if (this.selections.length != 0) {
      const clickedElement = event.target as HTMLElement;
      if (!clickedElement.closest('app-name-profile')) this.clearSelection();
    }
  }

  onSelectionUpdated(selection: selectionStatus) {
    if (selection.status) {
      this.selections.push(selection.profile);
    } else {
      const index = this.selections.indexOf(selection.profile);
      if (index !== -1) {
        this.selections.splice(index, 1);
      }
    }
    if (this.selections.length) this.enableClickListener();
    else this.disableClickListener();
  }

  enableClickListener() {
    if (!this.clickListenerActive) {
      this.clickListenerActive = true;
      this.selectonListener = this.renderer.listen(
        'document',
        'click',
        this.SelectionClickHandler
      );
    }
  }

  disableClickListener() {
    this.clickListenerActive = false;
    if (this.selectonListener) this.selectonListener();
  }

  //- end - multi-selection functions

  clearSelection() {
    this.selections = [];
    this.selectionCleared.next();
    this.disableClickListener();
  }

  checkValid(profilePack: any) {
    return this.validator.profilesValidator(profilePack);
  }

  importProfiles(file: any) {
    //TODO ADD BULK ADD ACTION
    let fileReader = new FileReader();
    fileReader.onload = () => {
      try {
        let impData;
        if (fileReader.result)
          impData = JSON.parse(fileReader.result as string);
        if (this.checkValid(impData)) {
          //   this.profiles = impData;
          this.setLocalStorage();
          //     this.toastr.success(
          //       `successfully imported ${this.profiles.length} profiles`,
          //       'Success'
          //     );
        } else {
          this.toastr.error('Invalid profile file');
        }
      } catch (error) {
        console.log(error);
        this.toastr.error('Invalid profile file');
      }
    };
    fileReader.readAsText(file);
  }

  fetchFromLocalStorage() {
    //TODO BULK ADD ACTION
    let profiles = localStorage.getItem('myProfiles');
    if (profiles != null) {
      let json = JSON.parse(profiles);
      if (this.checkValid(json))
        this.store.localDispatch(LocalActionType.SET_PROFILES, {
          profiles: json,
        });
    }
  }
  setLocalStorage() {
    localStorage.setItem(
      'myProfiles',
      JSON.stringify(this.getCurrentProfiles())
    );
    console.log(localStorage);
  }

  getCurrentProfiles() {
    return this.store.getValue().profiles;
  }
}
