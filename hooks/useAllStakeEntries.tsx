import { AccountData } from '@cardinal/common'
import { StakeEntryData } from '../cardinal/programs/stakePool'
import { getAllStakeEntries } from '../cardinal/programs/stakePool/accounts'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useQuery } from 'react-query'
import { useStakePoolId } from './useStakePoolId'

export const useAllStakeEntries = () => {
  const { secondaryConnection } = useEnvironmentCtx()
  const stakePoolId = useStakePoolId()
  return useQuery<AccountData<StakeEntryData>[] | undefined>(
    ['useAllStakeEntries', stakePoolId?.toString()],
    async () => {
      return getAllStakeEntries(secondaryConnection)
    }
  )
}
