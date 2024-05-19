import { CdkDragDrop, CdkDragStart } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { slideInAnimation } from 'src/app/classes/animations';
import { ActionType } from 'src/app/classes/constants';
import { FoodItem } from 'src/app/classes/food-item';
import { Participant } from 'src/app/classes/participant';
import { Profile } from 'src/app/classes/profile';
import { SimpleProfileService } from 'src/app/services/simple-profile.service';
import { AppStoreService } from 'src/app/store/app-store.service';

@Component({
  selector: 'app-food-item-panel',
  templateUrl: './food-item-panel.component.html',
  styleUrls: ['./food-item-panel.component.scss'],
  animations: [slideInAnimation],
})
export class FoodItemPanelComponent {
  @Input() foodData!: FoodItem;
  @Input() paletteIds: string[] = [];
  @Output() removePanel = new EventEmitter<FoodItem>();

  totalRate: number = 0;
  showSuggestions: boolean = false;
  suggestionParticipants: Participant[] = [];
  constructor(
    private store: AppStoreService,
    private profiles: SimpleProfileService
  ) {}

  onPriceUpdated() {
    this.store.dispatch(ActionType.UPDATE_DISH_PRICE, {
      id: this.foodData.id,
      price: this.foodData.price,
    });
  }

  onContributionUpdated(participant: Participant) {
    this.store.dispatch(ActionType.UPDATE_PARTICIPANT_PRICE, {
      id: this.foodData.id,
      name: participant.name,
      contribution: participant.contribution,
    });
  }

  updateNameSocket(foodName: string) {
    this.store.dispatch(ActionType.UPDATE_PALETTE_FOODNAME, {
      id: this.foodData.id,
      name: foodName,
    });
  }

  updateIcon(icon: string) {
    this.foodData.logo = icon;
  }

  removePalette() {
    this.removePanel.emit(this.foodData);
  }
  removeParticipant(p: Participant) {
    this.store.dispatch(ActionType.REMOVE_PARTICIPANT, {
      name: p.name,
      id: this.foodData.id,
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    this.addParticipants(event.item.data);
  }

  addParticipants(profiles: Profile[]) {
    this.store.dispatch(ActionType.ADD_PARTICIPANT, {
      profiles: profiles,
      id: this.foodData.id,
    });
    if (this.showSuggestions) this.updateSuggestions();
  }

  onMenuOption(option: string) {
    switch (option) {
      case 'reset':
        this.store.dispatch(ActionType.RESET_PALETTE_DEFAULT_PRICE, {
          id: this.foodData.id,
        });
        break;
      case 'split':
        this.store.dispatch(ActionType.SPLIT_EVENLY, {
          id: this.foodData.id,
        });
        break;
      case 'clear':
        this.store.dispatch(ActionType.CLEAR_PALETTE_PARTICIPANTS, {
          id: this.foodData.id,
        });
        break;
    }
  }

  //drag events
  dragStarted(ev: CdkDragStart, participant: Participant): void {
    ev.source.data = [participant.profile];
  }
  dragEnded() {
    //nothing for now
  }

  toggleQuickAddPreview(event: Event) {
    event.preventDefault();
    console.log('toggling quick add');
    this.showSuggestions = !this.showSuggestions;
    if (this.showSuggestions) {
      this.updateSuggestions();
    }
  }

  updateSuggestions() {
    const profiles = this.profiles.getCurrentProfiles();
    const currentParticipantsSet = new Set(
      this.participants.map((p) => p.profile.name)
    );
    const profileSuggestions = profiles
      .filter((profile) => !currentParticipantsSet.has(profile.name))
      .slice(0, 5);
    this.suggestionParticipants = profileSuggestions.map(
      (profile) => new Participant(profile, 0)
    );
  }

  addPreviewParticipant(participant: Participant) {
    this.addParticipants([participant.profile]);
  }

  get participants() {
    return this.foodData.participants;
  }
}
