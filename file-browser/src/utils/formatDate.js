import format from 'date-fns/format';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

export const recencyThreshold = 1000 * 60 * 60 * 12;

export default function formatDate(
  date,
  { allowFuzzyDateIfRecent = false } = {},
) {
  const isRecent = Date.now() - new Date(date).valueOf() < recencyThreshold;
  const useFuzzyDate = isRecent && allowFuzzyDateIfRecent;
  const formattedDate = useFuzzyDate
    ? distanceInWordsToNow(date, { addSuffix: true })
    : format(date, 'MMMM D, YYYY @ hh:mm a');
  return formattedDate;
}
