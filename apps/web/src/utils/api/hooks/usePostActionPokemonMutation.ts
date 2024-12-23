import { useMutation } from '@tanstack/react-query';

import type { PostStatisticActionParamstConfig } from '../requests';

import { postPokemonStatistic } from '../requests';

export const usePostStatisticActionMutation = (
  settings?: MutationSettings<PostStatisticActionParamstConfig, typeof postPokemonStatistic>
) =>
  useMutation({
    mutationKey: ['postStatisticAction'],
    mutationFn: ({ params, config }) =>
      postPokemonStatistic({ params, config: { ...settings?.config, ...config } }),
    ...settings?.options,
  });
