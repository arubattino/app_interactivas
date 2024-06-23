import requests

# URL del servidor
url = 'http://localhost:3001/login'

# Datos de inicio de sesión
data = {
    'mail': 'juanc.sanchez@example.com',
    'password': 'password123'
}

# Realizar solicitud POST para iniciar sesión
response = requests.post(url, json=data)

# Imprimir el resultado
print(response.status_code)
print(response.json())
