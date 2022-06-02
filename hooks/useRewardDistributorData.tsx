import { useEnvironmentCtx } from 'providers/EnvironmentProvider'
import { useStakePoolId } from './useStakePoolId'
import { findRewardDistributorId } from '../cardinal/programs/rewardDistributor/pda'
import { getRewardDistributor } from '../cardinal/programs/rewardDistributor/accounts'
import { AccountData } from '@cardinal/common'
import { RewardDistributorData } from '../cardinal/programs/rewardDistributor'
import { useQuery } from 'react-query'

export const useRewardDistributorData = () => {
  const stakePoolId = useStakePoolId()
  const { secondaryConnection } = useEnvironmentCtx()
  return useQuery<AccountData<RewardDistributorData> | undefined>(
    ['useRewardDistributorData', stakePoolId?.toString()],
    async () => {
      if (!stakePoolId) return
      const [rewardDistributorId] = await findRewardDistributorId(stakePoolId)
      return await getRewardDistributor(
        secondaryConnection,
        rewardDistributorId
      )
    },
    { enabled: !!stakePoolId }
  )
}
