from django.http import HttpResponse
from django.shortcuts import render
from django.db import connection


# Create your views here.
def employee_list(request):
    # Connect to the database and execute the query
    with connection.cursor() as cursor:
        query = """
            SELECT e.first_name, e.last_name, e.salary
            FROM employees e
            WHERE e.salary > 10000;
        """
        cursor.execute(query)
        results = cursor.fetchall()  # Fetch all results as a list of tuples

    employees = [{'first_name': row[0], 'last_name': row[1], 'salary': row[2]} for row in results]

    # Pass the results to the template
    return render(request, 'employees/employee_list.html', {'employees': employees})


def homepage(request):
    return render(request, 'homepage.html')