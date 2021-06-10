export class BingoSyncUtils {
  public static formatJson (goals: string[]): string {
    let output = '['
    for (const goal of goals) {
      output += `{"name":"${goal}"},`
    }
    output = output.slice(0,-1)
    output += ']'
    return output
  }
}
