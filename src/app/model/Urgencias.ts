export class Urgencias{
    public id: number | undefined;
    public fechaDeIngreso: Date | undefined;
    public horaDeIngreso: Date | undefined;
    public fechaDeSalida: Date | undefined;
    public horaDeSalida: Date | undefined;
    public causaExterna: string | undefined;
    public conducta: string | undefined;
    public horasDeObservacion: number | undefined;
    public tipoDeHistoriaClinica: string | undefined;
    public idPaciente: number | undefined;
    public idPersonalMedico: number | undefined;
}