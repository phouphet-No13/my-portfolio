import prisma from './src/lib/prisma'

async function main() {
  const categories = ['Website', 'Mobile App', 'Design', 'Branding']
  
  for (const name of categories) {
    try {
      await prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      })
      console.log(`Added category: ${name}`)
    } catch (e: unknown) {
      if (e instanceof Error) {
        console.log(`Failed to add category: ${name}`, e.message)
      } else {
        console.log(`Failed to add category: ${name}`, e)
      }
    }
  }
  console.log('Categories added successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
