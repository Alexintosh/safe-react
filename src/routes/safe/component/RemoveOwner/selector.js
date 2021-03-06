// @flow
import { List } from 'immutable'
import { createStructuredSelector, createSelector } from 'reselect'
import { userAccountSelector } from '~/wallets/store/selectors/index'
import { type Transaction } from '~/routes/safe/store/model/transaction'
import { safeTransactionsSelector } from '~/routes/safe/store/selectors/index'

const pendingTransactionsSelector = createSelector(
  safeTransactionsSelector,
  (transactions: List<Transaction>) =>
    transactions.findEntry((transaction: Transaction) => {
      const txHash = transaction.get('tx')

      return txHash === '' || txHash === undefined
    }) !== undefined,
)

export type SelectorProps = {
  executor: userAccountSelector,
  pendingTransactions: pendingTransactionsSelector,
}

export default createStructuredSelector({
  executor: userAccountSelector,
  pendingTransactions: pendingTransactionsSelector,
})
