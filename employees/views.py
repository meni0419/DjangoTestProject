from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.db import connection
import json

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
    if request.method == 'POST':
        text = request.POST.get("text", "")
        transliterated_text = transliterate_ua_text(text)
        return JsonResponse({'transliterated_text': transliterated_text})
    return render(request, 'homepage.html')

def transliterate_ua_text(input_text):
    return (input_text.replace("q", "й")
            .replace("w", "ц")
            .replace("e", "у")
            .replace("r", "к")
            .replace("t", "е")
            .replace("y", "н")
            .replace("u", "г")
            .replace("i", "ш")
            .replace("o", "щ")
            .replace("p", "з")
            .replace("[", "х")
            .replace("]", "ї")
            .replace("a", "ф")
            .replace("s", "і")
            .replace("d", "в")
            .replace("f", "а")
            .replace("g", "п")
            .replace("h", "р")
            .replace("j", "о")
            .replace("k", "л")
            .replace("l", "д")
            .replace(";", "ж")
            .replace("'", "є")
            .replace("\\", "ґ")
            .replace("z", "я")
            .replace("x", "ч")
            .replace("c", "с")
            .replace("v", "м")
            .replace("b", "и")
            .replace("n", "т")
            .replace("m", "ь")
            .replace(",", "б")
            .replace(".", "ю")
            .replace("Q", "Й")
            .replace("W", "Ц")
            .replace("E", "У")
            .replace("R", "К")
            .replace("T", "Е")
            .replace("Y", "Н")
            .replace("U", "Г")
            .replace("I", "Ш")
            .replace("O", "Щ")
            .replace("P", "З")
            .replace("{", "Х")
            .replace("}", "Ї")
            .replace("A", "Ф")
            .replace("S", "І")
            .replace("D", "В")
            .replace("F", "А")
            .replace("G", "П")
            .replace("H", "Р")
            .replace("J", "О")
            .replace("K", "Л")
            .replace("L", "Д")
            .replace(":", "Ж")
            .replace("\"", "Є")
            .replace("|", "Ґ")
            .replace("Z", "Я")
            .replace("X", "Ч")
            .replace("C", "С")
            .replace("V", "М")
            .replace("B", "И")
            .replace("N", "Т")
            .replace("M", "Ь")
            .replace("<", "Б")
            .replace(">", "Ю")
            .replace("@", "\"")
            .replace("#", "№")
            .replace("$", ";")
            .replace("^", ":")
            .replace("?", ",")
            .replace("/", "."))

def transliterate_ru_text(input_text):
    return (input_text.replace("q", "й")
            .replace("w", "ц")
            .replace("e", "у")
            .replace("r", "к")
            .replace("t", "е")
            .replace("y", "н")
            .replace("u", "г")
            .replace("i", "ш")
            .replace("o", "щ")
            .replace("p", "з")
            .replace("[", "х")
            .replace("]", "ъ")
            .replace("a", "ф")
            .replace("s", "ы")
            .replace("d", "в")
            .replace("f", "а")
            .replace("g", "п")
            .replace("h", "р")
            .replace("j", "о")
            .replace("k", "л")
            .replace("l", "д")
            .replace(";", "ж")
            .replace("'", "э")
            .replace("z", "я")
            .replace("x", "ч")
            .replace("c", "с")
            .replace("v", "м")
            .replace("b", "и")
            .replace("n", "т")
            .replace("m", "ь")
            .replace(",", "б")
            .replace(".", "ю")
            .replace("Q", "Й")
            .replace("W", "Ц")
            .replace("E", "У")
            .replace("R", "К")
            .replace("T", "Е")
            .replace("Y", "Н")
            .replace("U", "Г")
            .replace("I", "Ш")
            .replace("O", "Щ")
            .replace("P", "З")
            .replace("{", "Х")
            .replace("}", "Ъ")
            .replace("A", "Ф")
            .replace("S", "Ы")
            .replace("D", "В")
            .replace("F", "А")
            .replace("G", "П")
            .replace("H", "Р")
            .replace("J", "О")
            .replace("K", "Л")
            .replace("L", "Д")
            .replace(":", "Ж")
            .replace("\"", "Э")
            .replace("Z", "Я")
            .replace("X", "Ч")
            .replace("C", "С")
            .replace("V", "М")
            .replace("B", "И")
            .replace("N", "Т")
            .replace("M", "Ь")
            .replace("<", "Б")
            .replace(">", "Ю")
            .replace("@", "\"")
            .replace("#", "№")
            .replace("$", ";")
            .replace("^", ":")
            .replace("?", ",")
            .replace("/", "."))