import fs from 'fs'
import path from 'path'
import { WeightedGoal, WeightedGoalRaw } from '../types'
const csv = require('csv-parser')

export class GoalLoader {
  private static dataFolder = '../data'

  public static async loadCsv<T> (filename: string): Promise<T[]> {
    const csvData: T[] = []
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, this.dataFolder, filename))
        .pipe(csv({
          mapHeader: ({ header }: { header: string }) => header.trim(),
          mapValues: ({ value }: { value: string }) => value.trim(),
          skipComments: true,
          strict: true
        }))
        .on('data', (data: T) => csvData.push(data))
        .on('end', () => resolve(csvData))
        .on('error', reject)
    })
  }

  public static preprocessWeights (rawGoals: WeightedGoalRaw[]): WeightedGoal[] {
    return rawGoals.map(goal => {
      let weight = parseFloat(goal.weight)
      if (weight <= 0 || isNaN(weight)) {
        console.log(`WARN: ${goal.text} has an invalid weight. Defaulting to 1.`)
        weight = 1
      }
      return { ...goal, weight }
    })
  }
}
