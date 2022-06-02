import { AccountData } from '@cardinal/common'
import { StakePoolData } from '../cardinal/programs/stakePool'
import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolId } from './useStakePoolId'
import { getStakePool } from '../cardinal/programs/stakePool/accounts'
import { useQuery } from 'react-query'

export const useStakePoolData = () => {
  const stakePoolId = useStakePoolId()
  const { secondaryConnection } = useEnvironmentCtx()

  return useQuery<AccountData<StakePoolData> | undefined>(
    ['stakePoolData', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return
      return getStakePool(secondaryConnection, stakePoolId)
    },
    {
      enabled: !!stakePoolId,
    }
  )
}
