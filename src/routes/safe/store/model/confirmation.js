// @flow
import { Record } from 'immutable'
import type { RecordFactory, RecordOf } from 'immutable'
import { makeOwner, type Owner } from '~/routes/safe/store/model/owner'

export type ConfirmationProps = {
  owner: Owner,
  status: boolean, // false: not confirmed, true: confirmed
  hash: string,
}

export const makeConfirmation: RecordFactory<ConfirmationProps> = Record({
  owner: makeOwner(),
  status: false,
  hash: '',
})

export type Confirmation = RecordOf<ConfirmationProps>
