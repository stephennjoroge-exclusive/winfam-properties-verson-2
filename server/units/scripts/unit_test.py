from units.models import Unit

def run():
    unit  = Unit.objects.first()
    print(unit.unit_number)