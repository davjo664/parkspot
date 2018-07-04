import {EntitySubscriberInterface, EventSubscriber} from 'typeorm';
import {ParkSpotEntity} from '../modules/parkspot/parkspot.entity';
import {UpdateEvent} from 'typeorm/subscriber/event/UpdateEvent';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';

// only pass this data since we dont have the full, updated entity at this point.
export interface ParkspotUpdate {
  id: number;
  availabilityBefore: boolean;
  availabilityAfter: boolean;
}

@EventSubscriber()
export class ParkSpotUpdateSubscriber implements EntitySubscriberInterface<ParkSpotEntity> {



  /**
   * They only emit a value of a parkspot has changed from true to false. */
  private static _parkspotUpdates$ = new Subject<ParkspotUpdate>();
  public static parkspotUpdates$: Observable<ParkspotUpdate> = ParkSpotUpdateSubscriber._parkspotUpdates$.asObservable();


  /**
   * They only emit a value each time a parkspot has changed from (available * to available * ). */
  private static _spamUpdate$ = new Subject<ParkspotUpdate>();
  public static spamUpdate$: Observable<ParkspotUpdate> = ParkSpotUpdateSubscriber._spamUpdate$.asObservable();




  listenTo() {
    return ParkSpotEntity;
  }

  async beforeUpdate?(event: UpdateEvent<ParkSpotEntity>): Promise<void> {
    if (!event.entity) {
      // console.log('Skipping subscription since event.entity is undefined due to .update() call instead of .save() ');
      return;
    }
    const oldEntity = await  event.manager.getRepository(ParkSpotEntity).findOne(event.entity.id);

    if (!oldEntity) {
      // console.log('Skipping subscription since there is no entity matching the update');
      return;
    }


    // spam:
    // this code is so bad, it needs to be removed.
    if (typeof event.entity.available === typeof true && oldEntity.available !== event.entity.available) {
      ParkSpotUpdateSubscriber._spamUpdate$.next({
        id: oldEntity.id,
        availabilityBefore: oldEntity.available,
        availabilityAfter: event.entity.available
      });    }


    if (typeof event.entity.available === typeof true && oldEntity.available === true && event.entity.available === false) {
      ParkSpotUpdateSubscriber._parkspotUpdates$.next({
        id: oldEntity.id,
        availabilityBefore: oldEntity.available,
        availabilityAfter: event.entity.available
      });
    } else {
      // console.log('Skipping subscription since nothing changed or data missing');
    }
  };
}
