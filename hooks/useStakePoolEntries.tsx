import { AccountData } from '@cardinal/common'
import { StakeEntryData } from '../cardinal/programs/stakePool'
import { getActiveStakeEntriesForPool } from '../cardinal/programs/stakePool/accounts'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'
import { useStakePoolId } from './useStakePoolId'

export const useStakePoolEntries = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const stakePoolId = useStakePoolId()
  return useQuery<AccountData<StakeEntryData>[] | undefined>(
    ['useStakePoolEntries', stakePoolId?.toString()],
    async () => {
      if (stakePoolId) {
        return getActiveStakeEntriesForPool(secondaryConnection, stakePoolId)
      }
    },
    { enabled: !!stakePoolId }
  )
}
