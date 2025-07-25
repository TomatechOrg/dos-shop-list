import { ListItem } from '@/generated/prisma'
import '@testing-library/jest-dom'
import { count } from 'console'

async function GetItems() : Promise<ListItem[]>
{
    const entryData = await fetch("api/list", {
        method:'GET'
    })
    return await entryData.json()
} 

describe('List', () => {
  it('can create', async () => {
    var res = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"created"})
    })
    var id = (await res.json()).entry.id;
    var items = await GetItems();
    expect(items).toContain({name:"created", count:0, id:id});
  })

  it('can set count', async () => {
    var res = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"setCount"})
    })
    var id = (await res.json()).entry.id;
    await fetch("api/list/"+id, {
        method:'POST',
        body: JSON.stringify({count:5})
    })
    var items = await GetItems();
    expect(items).toContain({name:"setCount", count:5, id:id});
  })

  
  it('can delete', async () => {
    var res = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"delete"})
    })
    var id = (await res.json()).entry.id;
    
    var res2 = await fetch("api/list/"+id, {
        method:'DELETE'
    })

    var items = await GetItems();
    expect(items).not.toContain({name:"delete", count:0, id:id});
  })

  it('cant set count below zero', async () => {
    var res = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"setCountFail"})
    })
    var id = (await res.json()).entry.id;
    await fetch("api/list/"+id, {
        method:'POST',
        body: JSON.stringify({count:5})
    })
    var items = await GetItems();
    expect(items).toContain({name:"setCountFail", count:0, id:id});
  })

  it('cant create duplicate', async () => {
    var res = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"createDupeFail"})
    })
    var id = (await res.json()).entry.id;
    
    var res2 = await fetch("api/list", {
        method:'POST',
        body:JSON.stringify({name:"createDupeFail"})
    })
    expect(res2.status).toEqual(400)

    var items = await GetItems();
    expect(items).toContain({name:"createDupeFail", count:0, id:id});
  })
})