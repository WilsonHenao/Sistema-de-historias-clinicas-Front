export class Consulta{
    public id: number | undefined;
    public fechaDeConsulta: Date | undefined;
    public horaDeConsulta: Date | undefined;
    public tipoDeConsulta: string | undefined;
    public causaExterna: string | undefined;
    public conducta: string | undefined;
    public tipoDeHistoriaClinica: string | undefined;
    public idPaciente: number | undefined;
    public idPersonalMedico: number | undefined;
}