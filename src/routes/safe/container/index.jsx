// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import Page from '~/components/layout/Page'
import Layout from '~/routes/safe/component/Layout'
import NoRights from '~/routes/safe/component/NoRights'
import selector, { type SelectorProps } from './selector'
import actions, { type Actions } from './actions'

type Props = Actions & SelectorProps & {
  granted: boolean,
}

class SafeView extends React.PureComponent<Props> {
  componentDidMount() {
    this.intervalId = setInterval(() => {
      const { safe, fetchSafe, fetchBalance } = this.props
      if (!safe) { return }
      const safeAddress: string = safe.get('address')
      fetchBalance(safeAddress)
      if (safe) {
        fetchSafe(safe)
      }
    }, 1500)
  }

  componentWillUnmount() {
    clearInterval(this.intervalId)
  }

  intervalId: IntervalID

  render() {
    const {
      safe, provider, balance, granted, userAddress,
    } = this.props

    return (
      <Page>
        { granted
          ? <Layout balance={balance} provider={provider} safe={safe} userAddress={userAddress} />
          : <NoRights />
        }
      </Page>
    )
  }
}

export default connect(selector, actions)(SafeView)
