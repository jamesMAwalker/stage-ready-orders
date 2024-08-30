const stageReadyTags = ['STUDIOSTAGEREADY', 'TEAMSTAGEREADY', 'STUDIOOWNER', 'STUDIO OWNER']

export function checkStageReady(customer: IShopifyCustomer) {
  const isStageReady = stageReadyTags.some(tag => {
    return customer?.tags?.includes(tag)
  })

  return isStageReady;
}