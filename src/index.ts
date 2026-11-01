// @rex/catalogue: the public surface grows unit by unit (DESIGN §2.2).
import { qualify } from '@rex/kernel'
export * from './schema.ts'
export * from './load.ts'
export * from './check.ts'
export * from './dates.ts'

/** The engine prefix every catalogue id carries (DESIGN §2.1). */
export const ENGINE = 'catalogue'

/** Qualify a local id `<kind>.<slug>` as `catalogue/<kind>.<slug>`. */
export function catalogueId(local: string): string {
  return qualify(ENGINE, local)
}
