export default function PowerSet(originalSet: unknown[]) {
  const subSets: Array<string[]> = []

  // 对长度为 n 的集合，共计 2^n 个子集
  const lengthOfCombination = 2 ** originalSet.length

  // 使用二进制位表示每个元素的选中情况，对应位为 1 则表示选中
  for (let i = 0; i < lengthOfCombination; i++) {
    const subSet: string[] = []
    // 遍历每个元素，判断是否被选中
    for (let j = 0; j < originalSet.length; j++) {
      if ((i & (1 << j)) !== 0) {
        subSet.push(originalSet[j] as string)
      }
    }
    subSets.push(subSet)
  }

  // 返回所有子集
  return subSets
}
