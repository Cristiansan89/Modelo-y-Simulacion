print "-------------------------------------"
print "- Metodo de Congruencia Fundamental -"
print "-------------------------------------"
print " 	 v3 = (a*v2 + c*v1) % m 		"
print "-------------------------------------"
 v1 = int(input('Valor de la semilla (valor inicial): '))
m = int(input('Valor de m: '))
a = int(input('Valor de a: '))
c = int(input('Valor de c: '))
n = int(input('Cantidad de Iteraciones: '))
 if not((v1>0) and (m>0) and (a>0) and (c>0)):
	print "todos los valores deben ser mayores a 0"
 if not(m>a):
	print "m debe mayor que a"
 vector_resultados= []
 v2 = (a*v1 + c*v1) % m
vector_resultados.append(v2)
 for x in xrange(1, n):
	v3 = (a*v2 + c*v1) % m
	vector_resultados.append(v3)
	v1=v2
	v2=v3
 print 'Resultados'
print vector_resultado