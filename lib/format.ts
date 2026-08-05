import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return format(parseISO(dateStr), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return dateStr;
  }
}
