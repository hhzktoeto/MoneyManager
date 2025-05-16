export class FormattingUtils {
    static formatDate(date: string): string {
        return new Date(date).toLocaleDateString("ru-RU", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).replace(" г.", "");
    }
}