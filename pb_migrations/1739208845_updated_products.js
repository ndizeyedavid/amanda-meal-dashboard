/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // remove field
  collection.fields.removeById("text3455873878")

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "select3455873878",
    "maxSelect": 1,
    "name": "product_category",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "Drinks",
      "Food",
      "Snacks",
      "Beverages",
      "Fruits"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_4092854851")

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text3455873878",
    "max": 0,
    "min": 0,
    "name": "product_category",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("select3455873878")

  return app.save(collection)
})
