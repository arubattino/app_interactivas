from pymongo import MongoClient

def print_all_documents(db_name):
    # Conectar al servidor MongoDB en localhost:27017
    client = MongoClient('localhost', 27017)

    # Seleccionar la base de datos
    db = client[db_name]

    # Obtener todas las colecciones en la base de datos
    collections = db.list_collection_names()

    # Recorrer cada colección y sus documentos
    for collection_name in collections:
        collection = db[collection_name]
        print(f'Colección: {collection_name}')
        documents = collection.find()
        for document in documents:
            print(document)

# Cambia 'nombre_base_datos' por el nombre de tu base de datos
print_all_documents('usuarios')


