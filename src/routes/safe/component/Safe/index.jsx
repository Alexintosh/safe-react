// @flow
import * as React from 'react'
import Block from '~/components/layout/Block'
import Col from '~/components/layout/Col'
import Bold from '~/components/layout/Bold'
import Img from '~/components/layout/Img'
import Paragraph from '~/components/layout/Paragraph'
import Row from '~/components/layout/Row'
import { type Safe } from '~/routes/safe/store/model/safe'
import List from '@material-ui/core/List'

import Withdraw from '~/routes/safe/component/Withdraw'
import Transactions from '~/routes/safe/component/Transactions'
import AddTransaction from '~/routes/safe/component/AddTransaction'
import Threshold from '~/routes/safe/component/Threshold'
import AddOwner from '~/routes/safe/component/AddOwner'
import RemoveOwner from '~/routes/safe/component/RemoveOwner'
import EditDailyLimit from '~/routes/safe/component/EditDailyLimit'

import Address from './Address'
import Balance from './Balance'
import Owners from './Owners'
import Confirmations from './Confirmations'
import DailyLimit from './DailyLimit'
import MultisigTx from './MultisigTx'

const safeIcon = require('./assets/gnosis_safe.svg')

type SafeProps = {
  safe: Safe,
  balance: string,
  userAddress: string,
}

type State = {
  component: React$Node,
}

const listStyle = {
  width: '100%',
}

class GnoSafe extends React.PureComponent<SafeProps, State> {
  state = {
    component: undefined,
  }

  onEditDailyLimit = () => {
    const { safe } = this.props

    const value = safe.get('dailyLimit').get('value')
    this.setState({ component: <EditDailyLimit safe={safe} dailyLimit={value} onReset={this.onListTransactions} /> })
  }

  onWithdraw = () => {
    const { safe } = this.props

    this.setState({ component: <Withdraw safe={safe} dailyLimit={safe.get('dailyLimit')} /> })
  }

  onAddTx = () => {
    const { balance, safe } = this.props
    this.setState({
      component: <AddTransaction safe={safe} balance={Number(balance)} onReset={this.onListTransactions} />,
    })
  }

  onListTransactions = () => {
    const { safe } = this.props

    this.setState({ component: <Transactions safeName={safe.get('name')} safeAddress={safe.get('address')} onAddTx={this.onAddTx} /> })
  }

  onEditThreshold = () => {
    const { safe } = this.props

    this.setState({ component: <Threshold numOwners={safe.get('owners').count()} safe={safe} onReset={this.onListTransactions} /> })
  }

  onAddOwner = (e: SyntheticEvent<HTMLButtonElement>) => {
    const { safe } = this.props
    e.stopPropagation()
    this.setState({ component: <AddOwner threshold={safe.get('threshold')} safe={safe} /> })
  }

  onRemoveOwner = (name: string, address: string) => {
    const { safe } = this.props

    this.setState({ component: <RemoveOwner safeAddress={safe.get('address')} threshold={safe.get('threshold')} safe={safe} name={name} userToRemove={address} /> })
  }

  render() {
    const { safe, balance, userAddress } = this.props
    const { component } = this.state

    return (
      <Row grow>
        <Col sm={12} top="xs" md={5} margin="xl" overflow>
          <List style={listStyle}>
            <Balance balance={balance} />
            <Owners
              owners={safe.owners}
              onAddOwner={this.onAddOwner}
              userAddress={userAddress}
              onRemoveOwner={this.onRemoveOwner}
            />
            <Confirmations confirmations={safe.get('threshold')} onEditThreshold={this.onEditThreshold} />
            <Address address={safe.get('address')} />
            <DailyLimit balance={balance} dailyLimit={safe.get('dailyLimit')} onWithdraw={this.onWithdraw} onEditDailyLimit={this.onEditDailyLimit} />
            <MultisigTx balance={balance} onAddTx={this.onAddTx} onSeeTxs={this.onListTransactions} />
          </List>
        </Col>
        <Col sm={12} center="xs" md={7} margin="xl" layout="column">
          <Block margin="xl">
            <Paragraph size="lg" noMargin align="right">
              <Bold>{safe.name.toUpperCase()}</Bold>
            </Paragraph>
          </Block>
          <Row grow>
            <Col sm={12} center={component ? undefined : 'sm'} middle={component ? undefined : 'sm'} layout="column">
              { component || <Img alt="Safe Icon" src={safeIcon} height={330} /> }
            </Col>
          </Row>
        </Col>
      </Row>
    )
  }
}

export default GnoSafe
