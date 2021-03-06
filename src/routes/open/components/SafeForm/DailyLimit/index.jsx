// @flow
import * as React from 'react'
import Field from '~/components/forms/Field'
import TextField from '~/components/forms/TextField'
import { composeValidators, mustBeFloat, required, minValue } from '~/components/forms/validator'
import Block from '~/components/layout/Block'
import { FIELD_DAILY_LIMIT } from '~/routes/open/components/fields'

const DailyLimit = () => (
  <Block margin="md">
    <Field
      name={FIELD_DAILY_LIMIT}
      component={TextField}
      type="text"
      validate={composeValidators(required, mustBeFloat, minValue(0))}
      placeholder="Daily Limit*"
      text="Daily Limit"
    />
  </Block>
)

export default DailyLimit
