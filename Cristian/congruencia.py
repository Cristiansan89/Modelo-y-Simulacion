print ("-------------------------------------")
print ("- Metodo de Congruencia Fundamental -")
print ("-------------------------------------")
# print (" 	 v3 = (a*v2 + c*v1) % m 		")
print ("   v(n+1) = (a * v(n) + c) % m ")
print ("-------------------------------------")

v1 = int(input('Valor de la semilla (valor inicial): '))
m = int(input('Valor de m: '))
a = int(input('Valor de a: '))
c = int(input('Valor de c: '))
n = int(input('Cantidad de Iteraciones: '))

if not((v1>0) and (m>0) and (a>0) and (c>0)):
	print ("Error: Todos los valores deben ser mayores a 0")
elif not(m>a):
	print ("Error: m debe mayor que a")
else:
	vector_resultados = []
	v2 = (a * v1 + c) % m
	vector_resultados.append(v2)
	for x in range(1, n):
		v3 = (a * v2 + c) % m
		vector_resultados.append(v3)
		v1=v2
		v2=v3
	print ('Resultados:')
	print (vector_resultados)
