import { GoalLoader } from './GoalLoader'
import { BingoSyncUtils } from './BingoSyncUtils'
import { WeightedGoalRaw, WeightedGoal } from '../types'

export class SonicBingoGen {
  public static generateGoals (weightedGoals: WeightedGoal[]): string[] {
    if (weightedGoals.length < 25) {
      throw new Error('Fewer than 25 goals. Could not create bingo card.')
    }
    const generatedGoals = []
    const unusedGoals = [ ...weightedGoals ]
    while (generatedGoals.length < 25) {
      const totalWeight = unusedGoals.reduce((acc, val) => acc + val.weight, 0)
      let valueIndex = 0
      let randomWeight = Math.floor(Math.random() * totalWeight)
      while (randomWeight >= unusedGoals[valueIndex].weight) {
        randomWeight -= unusedGoals[valueIndex].weight
        valueIndex++
      }
      generatedGoals.push(unusedGoals[valueIndex].text)
      unusedGoals.splice(valueIndex, 1)
    }
    return generatedGoals
  }

  public static async run (): Promise<void> {
    const rawWeightedGoals: WeightedGoalRaw[] = await GoalLoader.loadCsv<WeightedGoalRaw>('weighted-goals.csv')
    const weightedGoals: WeightedGoal[]  = GoalLoader.preprocessWeights(rawWeightedGoals)
    const generatedGoals: string[] = this.generateGoals(weightedGoals)
    console.log(BingoSyncUtils.formatJson(generatedGoals))
  }
}
