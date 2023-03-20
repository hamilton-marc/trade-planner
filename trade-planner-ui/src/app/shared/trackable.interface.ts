/**
 * This interface contains fields that would typically used
 * in a persistence layer to track an items uniqueness as well
 * as when the item was created and updated.
 *
 * @author Union Hills Software
 * @date   November 11, 2018
 *
 */

export interface Trackable {
  id?: string;

  createdAt: Date;
  updatedAt: Date;
}
